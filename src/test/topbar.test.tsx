import { beforeEach, describe, expect, it } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import TopBar from "@/components/TopBar";
import { useAppStore } from "@/store/appStore";

describe("TopBar actions", () => {
  beforeEach(() => {
    useAppStore.setState({
      activeScreen: "search",
      guided: false,
      alerts: [],
    });
  });

  it("AI Insight guides to next purchase step", () => {
    render(<TopBar />);
    fireEvent.click(screen.getByText("AI Insight"));
    expect(useAppStore.getState().activeScreen).toBe("details");
    expect(useAppStore.getState().guided).toBe(true);
  });

  it("AI Insight advances from risk to watchlist", () => {
    act(() => {
      useAppStore.setState({ activeScreen: "risk" });
    });
    render(<TopBar />);
    fireEvent.click(screen.getByText("AI Insight"));
    expect(useAppStore.getState().activeScreen).toBe("watchlist");
  });

  it("notification button routes to watchlist", () => {
    render(<TopBar />);
    fireEvent.click(screen.getByTitle("Alerts"));
    expect(useAppStore.getState().activeScreen).toBe("watchlist");
  });

  it("shows unread badge count for alerts", () => {
    useAppStore.setState({
      alerts: [
        {
          id: "a1",
          propertyId: "SJ1",
          propertyTitle: "Test",
          type: "priceChange",
          message: "m1",
          isRead: false,
        },
        {
          id: "a2",
          propertyId: "SJ2",
          propertyTitle: "Test2",
          type: "newMatch",
          message: "m2",
          isRead: false,
        },
      ],
    });

    render(<TopBar />);
    expect(screen.getByText("2")).toBeInTheDocument();
  });
});
