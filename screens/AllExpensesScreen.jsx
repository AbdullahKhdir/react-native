import { useSelector } from "react-redux";
import { ExpenseOutput } from "../components/ExpensesOutput/ExpensesOutput";
import { LoadingOverlay } from "../components/ui/LoadingOverlay";

export default function AllExpensesScreen({ navigation, router }) {
    return (
        <ExpenseOutput expensePeriod='Total' fallBackText='No expenses registered found!'/>
    );
}