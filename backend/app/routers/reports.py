# backend/app/routers/reports.py
import csv
import io

from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session

from ..database import get_db
from ..models.renewal import Renewal
from ..services.security import get_current_admin

router = APIRouter()


@router.get("/reports/renewals.csv")
def export_renewals_csv(
    db: Session = Depends(get_db),
    current_admin=Depends(get_current_admin),
):
    output = io.StringIO()
    writer = csv.writer(output)

    writer.writerow(
        [
            "id",
            "customer_name",
            "contract_id",
            "value",
            "status",
            "owner_email",
            "renewal_date",
            "subscription_start",
            "subscription_end",
            "churn_risk",
        ]
    )

    for r in db.query(Renewal).order_by(Renewal.renewal_date).all():
        writer.writerow(
            [
                r.id,
                r.customer_name,
                r.contract_id,
                r.value,
                r.status,
                r.owner_email,
                r.renewal_date,
                r.subscription_start,
                r.subscription_end,
                r.churn_risk,
            ]
        )

    csv_data = output.getvalue()
    return Response(
        content=csv_data,
        media_type="text/csv",
        headers={"Content-Disposition": 'attachment; filename="renewals.csv"'},
    )
