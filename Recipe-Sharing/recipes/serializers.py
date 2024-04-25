from rest_framework import serializers
from .models import Recipe

class RecipeSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Recipe
        fields = ['id', 'title', 'ingredients', 'instructions', 'prep_time', 'cook_time', 'image', 'image_url']
        read_only_fields = ['image_url']

    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url
        return None

    def validate_title(self, value):
        if not value.strip():
            raise serializers.ValidationError("Title cannot be empty.")
        return value

    def validate(self, data):
        prep_time = data.get('prep_time')
        cook_time = data.get('cook_time')
        
        if prep_time is not None and prep_time < 0:
            raise serializers.ValidationError("Prep time must be non-negative.")
        
        if cook_time is not None and cook_time < 0:
            raise serializers.ValidationError("Cook time must be non-negative.")
        
        if prep_time is not None and cook_time is not None and prep_time > cook_time:
            raise serializers.ValidationError("Cook time cannot be less than prep time.")
        
        return data

    def create(self, validated_data):
        image = validated_data.pop('image', None)
        recipe = Recipe.objects.create(**validated_data)
        if image:
            recipe.image = image
            recipe.save()
        return recipe

    def update(self, instance, validated_data):
        # Adjusted to handle image update separately
        image = validated_data.pop('image', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if image:
            instance.image = image
        instance.save()
        return instance
