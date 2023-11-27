import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Chart from "@/components/Chart";
import { ThemeProvider } from "next-themes";
import { ThemeSwitcher } from "./ThemeSwitcher";

describe('Chart component', () => {
  test('renders Chart component with data', async () => {
    // Mock the fetch function to return specific data
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        data: [
          {
            current: 1500,
            last_month: 1200,
          },
          {
            current: 2000,
            last_month: 1800,
          },
          {
            current: 500,
            last_month: 400,
          },
        ],
      }),
      ok: true,
      headers: new Headers(),
    });

    render(<Chart />);

    // Assert that "Active Users", "Transactions", "Cards Issued" are initially displayed
    expect(screen.getByText("Active Users")).toBeInTheDocument();
    expect(screen.getByText("Transactions")).toBeInTheDocument();
    expect(screen.getByText("Cards Issued")).toBeInTheDocument();

    // Wait for the component to fetch data and render
    await waitFor(() => {
      // Assert that the rendered data is present
      expect(screen.getByText("1500")).toBeInTheDocument();
      expect(screen.getByText("2000")).toBeInTheDocument();
      expect(screen.getByText("500")).toBeInTheDocument();
    });

    // Restore the original fetch function
    (global.fetch().mockRestore());
  });

  test('handles fetch error', async () => {
    // Mock the fetch function to throw an error
    jest.spyOn(global, "fetch").mockRejectedValueOnce("error");

    render(<Chart />);

    // Wait for the component to handle the fetch error
    await waitFor(() => {
      // Assert that the error message is displayed
      expect(screen.getByText("Error fetching data:")).toBeInTheDocument();
    });

    // Restore the original fetch function
    (global.fetch().mockRestore());
  });
});



describe('ThemeSwitcher component', () => {
  test('renders ThemeSwitcher component and switches theme', () => {
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeSwitcher />
      </ThemeProvider>
    );

  
    const themeSwitchButton = screen.getByRole('button');
    expect(themeSwitchButton).toBeInTheDocument();

    
    expect(themeSwitchButton).toHaveTextContent('Light');

   
    fireEvent.click(themeSwitchButton);

   
    expect(themeSwitchButton).toHaveTextContent('Dark');
  });
});


