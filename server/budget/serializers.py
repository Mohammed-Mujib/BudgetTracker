from rest_framework import serializers
from .models import Transaction

# class TransactionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Transaction
#         fields = ['user', 'transaction_type', 'name', 'amount', 'category', 'date']  # Include the fields you want to serialize

#     def validate(self, data):
#         transaction_type = data.get('transaction_type')
#         category = data.get('category')

#         if transaction_type == 'expense' and category not in dict(Transaction.EXPENSE_CATEGORIES):
#             raise serializers.ValidationError("Invalid category for expense.")

#         if transaction_type == 'income' and category not in dict(Transaction.INCOME_CATEGORIES):
#             raise serializers.ValidationError("Invalid category for income.")

#         return data
from rest_framework import serializers
from .models import Transaction

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['name', 'transaction_type', 'amount', 'category','date']
    def validate(self, data):
        transaction_type = data.get('transaction_type')
        category = data.get('category')

        if transaction_type == 'expense' and category not in dict(Transaction.EXPENSE_CATEGORIES):
            raise serializers.ValidationError("Invalid category for expense.")

        if transaction_type == 'income' and category not in dict(Transaction.INCOME_CATEGORIES):
            raise serializers.ValidationError("Invalid category for income.")

        return data