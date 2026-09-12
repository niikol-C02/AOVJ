#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
VOCACCIÓN DATASET BUILDER
Creates:
1. src/models/colombianUniversitiesData.ts (161 universities, 38 scholarships)
2. src/models/careersCatalog.ts (1,050+ careers)
3. src/models/careersData.ts (1,081+ total merged careers)
"""

import json
import os
import re

print("Initializing creation script...")
