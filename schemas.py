from pydantic import BaseModel
from datetime import date

class CreateExpense(BaseModel):
    description: str
    value: float
    date: date

class Expense(CreateExpense):
    id: int
