from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Transaction
from .serializers import TransactionSerializer
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

@method_decorator(csrf_exempt, name='dispatch')
class TransactionView(APIView):
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users can access this view

    def get(self, request):
        """List all transactions for the authenticated user."""
        transactions = Transaction.objects.filter(user=request.user)  # Filter transactions by user
        serializer = TransactionSerializer(transactions, many=True)  # Serialize the queryset
        return Response(serializer.data)

    def post(self, request):
        """Create a new transaction for the authenticated user."""
        serializer = TransactionSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save(user=request.user)  # Associate transaction with the logged-in user
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)