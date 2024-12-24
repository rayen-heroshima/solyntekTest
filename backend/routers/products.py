from fastapi import APIRouter, Depends, Form, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from schemas import Product, ProductCreate, ProductUpdate
from auth import get_current_user
import crud

router = APIRouter()

@router.get("/", response_model=list[Product])
async def get_products(
    skip: int = 0,
    limit: int = 10,
    search: str | None = None,
    sort: str | None = None,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    return crud.get_products(db, skip, limit, search, sort)

@router.post("/", response_model=Product)
async def create_product(
    product: ProductCreate,  # Use the Pydantic model for product creation
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    
    # Create the product with the image URL
    db_product = crud.create_product(db, product, current_user.id)
    return db_product

@router.put("/{product_id}", response_model=Product)
async def update_product(
    product_id: int,
    product: ProductUpdate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    db_product = crud.get_product(db, product_id)
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    if db_product.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")
    return crud.update_product(db, product_id, product)

@router.delete("/{product_id}")
async def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    db_product = crud.get_product(db, product_id)
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    if db_product.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")
    crud.delete_product(db, product_id)
    return {"message": "Product deleted"}
