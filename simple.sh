curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer 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" \
  -d '{
    "model": "gpt-3.5-turbo",
    "messages": [{"role": "system", "content": "Hey girl!"}]
  }'
