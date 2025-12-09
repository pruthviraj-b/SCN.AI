import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Wizard from './Wizard';

// Mock fetch
global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ recommendations: [] }),
    })
) as jest.Mock;

describe('Wizard Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the first step initially', () => {
        render(<Wizard />);
        expect(screen.getByText("Let's get to know you")).toBeInTheDocument();
    });

    it('validates name input on next step', () => {
        render(<Wizard />);
        const nextButton = screen.getByText('Next');

        // Try to click next without entering name
        fireEvent.click(nextButton);

        // Check for error message
        expect(screen.getByText('Name is required')).toBeInTheDocument();

        // Enter name
        const input = screen.getByPlaceholderText('e.g. Alex');
        fireEvent.change(input, { target: { value: 'Alex' } });

        // Click next again
        fireEvent.click(nextButton);

        // Should be on step 2
        expect(screen.getByText('What are your skills?')).toBeInTheDocument();
    });

    it('validates skills selection on step 2', () => {
        render(<Wizard />);

        // Complete Step 1
        const nameInput = screen.getByPlaceholderText('e.g. Alex');
        fireEvent.change(nameInput, { target: { value: 'Alex' } });
        fireEvent.click(screen.getByText('Next'));

        // Try to click next without selecting skills
        fireEvent.click(screen.getByText('Next'));
        expect(screen.getByText('Please select at least one skill')).toBeInTheDocument();

        // Select a skill
        fireEvent.click(screen.getByText('Python'));

        // Click next
        fireEvent.click(screen.getByText('Next'));

        // Should be on step 3
        expect(screen.getByText("What's your goal?")).toBeInTheDocument();
    });
});
