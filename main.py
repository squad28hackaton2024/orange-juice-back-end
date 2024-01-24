from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from schemas import CreateExpense, Expense


app = FastAPI()

app.mount("/index", StaticFiles(directory="C:/Projetos/Fin/static", html=True), name="static")

last_id = 0

EXPENSES = []


@app.get('/expenses')
def show_expenses() -> list[Expense]:
    return [
        Expense(**b) for b in EXPENSES
    ]


@app.post('/expenses')
def add_expense(expense: CreateExpense):
    global last_id
    new_expense = {'id':last_id+1, 'description':expense.description, 'value':expense.value, 'date':expense.date}
    last_id += 1
    EXPENSES.append(new_expense)
    return new_expense