from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from database import get_db
from schemas import UserCreate, User
import crud
from auth import create_token

router = APIRouter()

@router.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_token({"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}

@router.post("/register", response_model=User)
async def register(user: UserCreate, db: Session = Depends(get_db)):
    try:
        if crud.get_user_by_email(db, user.email):
            raise HTTPException(status_code=400, detail="Email already registered")
        return crud.create_user(db, user)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error: {str(e)}")
