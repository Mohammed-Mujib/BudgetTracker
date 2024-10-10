from django.db import models
from django.conf import settings  # Use settings to reference the User model

class Transaction(models.Model):
    TRANSACTION_TYPE_CHOICES = [
        ('expense', 'Expense'),
        ('income', 'Income'),
    ]

    EXPENSE_CATEGORIES = [
        ('bills', 'Bills'),
        ('transportation', 'Transportation'),
        ('clothes', 'Clothes'),
        ('education', 'Education'),
        ('fitness', 'Fitness'),
        ('gifts', 'Gifts'),
        ('food', 'Food'),
        ('health', 'Health'),
        ('furniture', 'Furniture'),
        ('pet', 'Pet'),
        ('shopping', 'Shopping'),
        ('travel', 'Travel'),
        ('others', 'Others'),
    ]

    INCOME_CATEGORIES = [
        ('allowance', 'Allowance'),
        ('awards', 'Awards'),
        ('bonus', 'Bonus'),
        ('investment', 'Investment'),
        ('lottery', 'Lottery'),
        ('salary', 'Salary'),
        ('tips', 'Tips'),
        ('others', 'Others'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    transaction_type = models.CharField(max_length=7, choices=TRANSACTION_TYPE_CHOICES)
    name = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    
    # Combine both sets of categories into a single choices list
    CATEGORY_CHOICES = EXPENSE_CATEGORIES + INCOME_CATEGORIES
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)

    date = models.DateField(auto_now_add=True)

    def clean(self):
        # Validate category based on transaction type
        if self.transaction_type == 'expense' and self.category not in dict(self.EXPENSE_CATEGORIES):
            raise ValueError("Invalid category for expense.")
        
        if self.transaction_type == 'income' and self.category not in dict(self.INCOME_CATEGORIES):
            raise ValueError("Invalid category for income.")

    def save(self, *args, **kwargs):
        # Call clean method to validate before saving
        self.clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.transaction_type.capitalize()}: {self.name} - {self.amount}"