#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
VOCACCIÓN FULL DATABASE BUILDER
Builds:
1. src/models/colombianUniversitiesData.ts (161 universities, 38 scholarships)
2. src/models/careersCatalog.ts (1,050+ careers)
3. src/models/careersData.ts (Merged catalog of 1,081+ careers)
"""

import json
import os
import re

print("Generating full dataset for Colombian Higher Education...")
