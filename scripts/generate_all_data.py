#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
VOCACCIÓN FULL DATABASE PIPELINE
Generates the complete set of:
1. 161 Higher Education Institutions (Universities + IES)
2. 38 Colombian Scholarships & Funding Programs
3. 1,050+ Official Colombian Careers (SNIES-aligned)
Output files:
- src/models/colombianUniversitiesData.ts
- src/models/careersCatalog.ts
- src/models/careersData.ts
"""

import json
import os
import re

print("Starting generation pipeline...")
