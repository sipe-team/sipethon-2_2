#!/bin/bash

# Navigate to the project root directory
cd "$(dirname "$0")/.."

# Run pytest against the tests directory
pytest -s tests/
