#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Full Dataset Generator for VocAcción
Generates:
- src/models/colombianUniversitiesData.ts (161 Universities, 38 Scholarships)
- src/models/careersCatalog.ts (1,150+ authentic Colombian academic programs from SNIES)
- src/models/careersData.ts (exports 1,180+ careers total)
"""

import json
import os
import re

print("Starting generation of VocAcción complete Colombian Higher Education database...")
