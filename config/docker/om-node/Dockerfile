FROM ubuntu:20.04

WORKDIR /app/

# Sepecify the major version of NodeJS to use
ENV nodeVersion=18
ENV nvmVersion=0.39.2

# Set custom uid environment variable
ARG uid=1000
ENV CUSTOM_UID=$uid

# Update Ubuntu's system packages
RUN apt-get update

# Install some various dependencies
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y curl git build-essential cmake python sudo nano vim libpq-dev

# Add the `user` user and provide permissions
RUN adduser --gecos "" --disabled-password --home /home/user --uid ${CUSTOM_UID} --shell /bin/bash user
RUN usermod -aG sudo user
RUN chown -R user:user /home/user
RUN chown -R user:user /app

# Install NVM/Node/Yarn for `root` for starting docker services
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v${nvmVersion}/install.sh | bash
RUN echo 'export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"' >> ~/.bash_profile
RUN echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm' >> ~/.bash_profile
RUN /bin/bash -lc "nvm install ${nodeVersion}"
RUN /bin/bash -lc "npm i -g yarn"

USER user

# Install NVM/Node/Yarn for `user` for individual commands
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v${nvmVersion}/install.sh | bash
RUN echo 'export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"' >> ~/.bash_profile
RUN echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm' >> ~/.bash_profile
RUN /bin/bash -lc "nvm install ${nodeVersion}"
RUN /bin/bash -lc "npm i -g yarn"
RUN touch ~/.sudo_as_admin_successful

# Do bare minimum copies to track changes to nodejs dependencies
# to cache the `yarn` install step
WORKDIR /tmp/
RUN mkdir -p /tmp/packages/api
RUN mkdir -p /tmp/packages/common
RUN mkdir -p /tmp/packages/director
RUN mkdir -p /tmp/packages/frontend
RUN mkdir -p /tmp/packages/match-function
COPY --chown=user:user packages/api/package.json /tmp/packages/api/package.json
COPY --chown=user:user packages/common/package.json /tmp/packages/common/package.json
COPY --chown=user:user packages/director/package.json /tmp/packages/director/package.json
COPY --chown=user:user packages/frontend/package.json /tmp/packages/frontend/package.json
COPY --chown=user:user packages/match-function/package.json /tmp/packages/match-function/package.json
COPY --chown=user:user package.json /tmp/package.json
COPY --chown=user:user yarn.lock /tmp/yarn.lock
COPY --chown=user:user scripts/check-yarn.js /tmp/scripts/check-yarn.js
RUN /bin/bash -lc "yarn"

# Move node_modules results over
RUN mkdir -p /app/packages/api
RUN mkdir -p /app/packages/common
RUN mkdir -p /app/packages/director
RUN mkdir -p /app/packages/frontend
RUN mkdir -p /app/packages/match-function
RUN mv /tmp/node_modules /app/
# only copy package node_modules if they exist
RUN /bin/bash -lc "[ ! -f /tmp/packages/api/node_modules ] || mv /tmp/packages/api/node_modules /app/packages/api/"
RUN /bin/bash -lc "[ ! -f /tmp/packages/common/node_modules ] || mv /tmp/packages/common/node_modules /app/packages/common/"
RUN /bin/bash -lc "[ ! -f /tmp/packages/director/node_modules ] || mv /tmp/packages/director/node_modules /app/packages/director/"
RUN /bin/bash -lc "[ ! -f /tmp/packages/frontend/node_modules ] || mv /tmp/packages/frontend/node_modules /app/packages/frontend/"
RUN /bin/bash -lc "[ ! -f /tmp/packages/match-function/node_modules ] || mv /tmp/packages/match-function/node_modules /app/packages/match-function/"

WORKDIR /app/
COPY --chown=user:user . /app/

# Run yarn again to fix symlinks to workspace packages
RUN /bin/bash -lc "yarn"

RUN /bin/bash -lc "yarn build"

EXPOSE 80

CMD ["/bin/bash", "-lc"]
