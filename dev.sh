#!/bin/bash

cd db && docker-compose up -d

cd .. && next dev

cd db && docker-compose down

cd ..
