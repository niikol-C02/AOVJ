#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
VOCACCIÓN FULL DATABASE BUILDER
Generates:
1. src/models/colombianUniversitiesData.ts (161 Higher Education Institutions + 38 Scholarships)
2. src/models/careersCatalog.ts (1,050+ Colombian academic programs from official SNIES standards)
3. src/models/careersData.ts (Merged catalog of 1,081+ careers)
"""

import json
import os
import sys

print("Initializing complete database builder...")
