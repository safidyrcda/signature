#!/bin/bash

# Définir le home correctement

# Home correct
export HOME=/home/safidy

# Charger nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

# Aller dans le dossier de l'app Next.js (celui où se trouve package.json)
cd /home/safidy/signature

# Lancer l'app
pnpm run start -p 8003

