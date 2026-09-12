#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generator script for VocAcción content expansion:
- 161 Colombian Higher Education Institutions (Universidades e IES)
- 38 Colombian Scholarships and Funding Programs
- 1,050+ Official SNIES Academic Programs (Careers) in Colombia
"""

import json
import os
import re

print("Building Colombian Higher Education database...")

# We will read the existing 16 universities and 7 scholarships from colombianUniversitiesData.ts
# so they are 100% preserved.
existing_unis_file = "src/models/colombianUniversitiesData.ts"
with open(existing_unis_file, "r", encoding="utf-8") as f:
    existing_content = f.read()

print("Original colombianUniversitiesData.ts read successfully.")
