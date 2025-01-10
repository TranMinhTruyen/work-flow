#!/bin/bash

echo "Building Next.js application..."

yarn build

if [ $? -ne 0 ]; then
  echo "Build failed! Please check the errors."
  exit 1
fi

echo "Creating necessary directories..."
mkdir -p .next/standalone/.next

echo "Copying static files..."
cp -r .next/static .next/standalone/.next/

echo "Build and copy completed successfully!"