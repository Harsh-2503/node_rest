#!/bin/bash

# Go to app folder
cd /home/ubuntu/node_rest
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion


# stop running process
if [ "$DEPLOYMENT_GROUP_NAME" == "Node-Rest-Staging" ];
then
  pm2 restart node_rest
else [ "$DEPLOYMENT_GROUP_NAME" == "Node-Rest-Production" ];
  pm2 restart node_rest
fi