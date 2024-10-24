from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Transaction
from .serializers import TransactionSerializer
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import logging

logger = logging.getLogger(__name__)

@method_decorator(csrf_exempt, name='dispatch')
# class TransactionView(APIView):
#     permission_classes = [IsAuthenticated]  # Ensure only authenticated users can access this view

#     def get(self, request):
#         logger.info("Received transaction data: %s", request.data)
#         print(logger.info("Received transaction data: %s", request.data))
#         """List all transactions for the authenticated user."""
#         transactions = Transaction.objects.filter(user=request.user)  # Filter transactions by user
#         serializer = TransactionSerializer(transactions, many=True)  # Serialize the queryset
#         return Response(serializer.data)

    
#     def post(self, request):
#         logger.info("Received transaction data: %s", request.data)
#         print("Request data:", request.data)  # Log incoming data
#         serializer = TransactionSerializer(data=request.data)
        
#         if serializer.is_valid():
#             serializer.save(user=request.user)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
        
#         print("Validation errors:", serializer.errors)  # Log errors
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TransactionView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # print(request.user.name)
        transactions = Transaction.objects.filter(user=request.user).order_by("-date")
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data)

    def post(self, request):
        # print(request.user.name)
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# def post(self, request):
    #     """Create a new transaction for the authenticated user."""
    #     serializer = TransactionSerializer(data=request.data)
        
    #     if serializer.is_valid():
    #         serializer.save(user=request.user)  # Associate transaction with the logged-in user
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
        
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)