#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
VOCACCIÓN FULL DATA PIPELINE
Generates:
1. src/models/colombianUniversitiesData.ts (161 universities, 38 scholarships)
2. src/models/careersCatalog.ts (1,050+ official Colombian academic programs)
3. src/models/careersData.ts (combined dataset of 1,081+ careers)
"""

import json
import os
import re

print("Starting VocAcción full database generation...")
