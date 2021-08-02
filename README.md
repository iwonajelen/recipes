# Recipes

try it: http://recipes-git-main.iwonajelen.vercel.app/

## Overview

Application allows you to save recipes on your board. You can fill the title, description, ingredients and url for the whole recipe content. 
Saved recipes appears in your board and you can browse them or search by typing part of the title or description in the search input. 
You can also share your recipes with another user by typing his GitHub username if he already has an account in the application.
You can also create a shopping list based on recipes that you choose and then you can edit that list.


## Login

You can login using your GitHub account. 

## Recipes board

Recipes are displayed as cards on your board. From this view you can edit specific recipe by clicking on the yellow pencil button next to recipe's title.
If someone shares recipe with you, it can be removed by clicking red trash button next to recipe's title.

## Create a recipe

There are 4 types of inputs that may be filled: Title, Description, Url and Ingredients.

* Title - title of recipe
* Description - content that is displayed under the title
* Url - url to an external page containing the entire recipe
* Ingredients - list of ingredients that is displayed as bulleted list on your recipe card

## Shopping list

You can create a shopping list from your recipes. You can choose some of them and the shopping list will be automatically created with ingredients of these recipes.
You can view the list by selecting Preview tab. That view contains checkable list of ingredients. 
You can also edit the list in Edit tab - there you can remove, add or edit existing ones.

## Made with

* React.js + Next.js
* MongoDB

