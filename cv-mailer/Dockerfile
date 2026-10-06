FROM node:22-alpine
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Disposable-domain blocklists, refreshed on every image build:
#   disposable-email-domains/disposable-email-domains  (curated, ~9k)
#   disposable/disposable-email-domains                (broad, ~100k)
RUN wget -qO- https://raw.githubusercontent.com/disposable-email-domains/disposable-email-domains/main/disposable_email_blocklist.conf > blocklist.txt \
 && wget -qO- https://raw.githubusercontent.com/disposable/disposable-email-domains/master/domains.txt >> blocklist.txt \
 && test "$(wc -l < blocklist.txt)" -gt 50000

COPY server.mjs ./

USER node
EXPOSE 8080
CMD ["node", "server.mjs"]
