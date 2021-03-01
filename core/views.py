from django.shortcuts import render

# Create your views here.
def list_of_songs(request):
    return render(request, 'project/templates/index.html')
