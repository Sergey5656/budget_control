import {FC} from 'react';
import TransactionForm from "../components/TransactionForm";
import {instance} from "../api/axios.api";
import {ICategory, IResponseTransactionLoader} from "../types/types";
import {toast} from "react-toastify";
import TransactionTable from "../components/TransactionTable";
import {useLoaderData} from "react-router-dom";
import Chart from "../components/Chart";

export const transactionLoader = async () => {
    const categories = await instance.get<ICategory[]>('/categories')
    const transactions = await instance.get('/transactions')
    const totalIncome  = await instance.get('/transactions/income/find')
    const totalExpense  = await instance.get('/transactions/expense/find')
    const data = {
        categories: categories.data,
transactions: transactions.data,
        totalExpense: totalExpense.data,
        totalIncome: totalIncome.data,
    }
    return data
}

export const transactionAction = async ({ request }: any) => {
switch (request.method) {
    case 'POST': {
        const formData = await request.formData()
        const newTransaction = {
            title: formData.get('title'),
            amount: +formData.get('amount'),
            category: +formData.get('category'),
            type: formData.get('type')
        }
        await instance.post('/transactions', newTransaction)
        toast.success('Готово')
        return null
    }
    case 'DELETE': {
        const formData = await request.formData()
        const transactionId = formData.get('id')
        await instance.delete(`/transactions/transaction/${transactionId}`)
        toast.success('Трназакция удалена')
        return null
    }
}
}
const Transaction: FC = () => {
    const {totalExpense, totalIncome} = useLoaderData() as IResponseTransactionLoader

    return (
        <>
            <div className="mt-4 grid grid-cols-3 items-start gap-4">
                {/* Add Transaction Form */}
                <div className="col-span-2 grid"><TransactionForm/></div>
                <div className="col-span-2 grid">Add Transaction Form</div>
                {/* Statistic blocks */}
                <div className="rounded-md bg-slate-800 p-3">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <p className="text-md text-center font-bold uppercase"> Total Income:
                            </p>
                            <p className="mt-2 rounded-sm bg-green-600 p-1 text-center">{totalIncome}
                            </p>
                        </div>
                        <div>
                            <p className="text-md text-center font-bold uppercase">
                            </p>
                            Total Expense:
                            <p className="mt-2 rounded-sm bg-red-500 p-1 text-center">
                                {totalExpense}
                            </p>
                        </div>
                    </div>
                    <>
                    <Chart totalIncome={totalIncome} totalExpense={totalExpense}/>
                    </>
                </div>
            </div>

            {/* Transaction Table*/}
            <h1 className="my-5">
                <TransactionTable limit={10}/>
                </h1>
            </>
            );
            };

            export default Transaction;