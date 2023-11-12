import { ExpenseOutput } from "../components/ExpensesOutput/ExpensesOutput";

export default function RecentExpenseScreen({ navigation, router }) {
    return (
        <ExpenseOutput expensePeriod='Last 7 Days' fallBackText='No expenses registered for the last 7 days'/>
    );
}