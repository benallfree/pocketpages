#!/bin/bash

# Get all branches that start with 'feat/' and store them in an array
branches=($(git branch --list 'chore/*' 'feat/*' 'fix/*' 'enh/*' 'test/*' 'next'| sed 's/  //'))

# Loop through each 'feat/' branch
for branch in "${branches[@]}"; do
    echo "Processing branch: $branch"

    # Checkout the 'feat/' branch
    git checkout "$branch"

    # Merge 'main' into the 'feat/' branch
    echo "Merging 'main' into '$branch'..."
    git merge main

    # Check if there are merge conflicts
    if [ $? -ne 0 ]; then
        echo "Merge conflict detected in '$branch'. Resolve the conflict and then press Enter to continue..."
        read -p ""
    fi
done

# Checkout master branch or the initial branch after completing the merges
git checkout main

echo "All branches have been processed."
