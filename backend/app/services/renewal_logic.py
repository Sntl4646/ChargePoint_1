from datetime import date

def check_expiry(renewal):
    today = date.today()
    if renewal.subscription_end < today:
        renewal.status = "expired"
    return renewal

def allow_renew(renewal):
    today = date.today()
    remaining = (renewal.subscription_end - today).days
    return remaining <= 30
