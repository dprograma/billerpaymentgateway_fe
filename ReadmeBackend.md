# MERCHANT ONBOARDING SERVICE

A. MERCHANT SIGNUP

    
ENDPOINT: 

`http://127.0.0.1:8000/merchantservice/create-merchant/`

PAYLOAD: 

```markdown
payload = {
        email: "ken@gmail.com",
        first_name: "kennedy",
        last_name: "egwuda",
        phone_number: "2348160093331",
        password: "ken@124$"
    };
```

REQUEST BODY:

```markdown
requestOptions = {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    };
```

RESPONSE BODY:

```markdown
{ status: "success", response: "Merchant created successfully. Please verify your account on ken@gmail.com." }

```

RESPONSE STATUS: 

`200 OK`

B. SEND EMAIL OTP

ENDPOINT:

`http://127.0.0.1:8000/merchantservice/otp-email/`

PAYLOAD:

```markdown
payload = {
          email: "ken@gmail.com",
        };
```

REQUEST BODY:

```markdown
requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        };
```

RESPONSE BODY:

```markdown
{ status: "success", response: "OTP sent to email ken@gmail.com." }
```

RESPONSE STATUS:

`200 OK`


C. SEND PHONE OTP

ENDPOINT:

`http://127.0.0.1:8000/merchantservice/otp-phone-number/`

PAYLOAD:

```markdown
payload = {
          phone_number: "2348160093332",
        };
```

REQUEST BODY:

```markdown
requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        };
```

RESPONSE BODY:

```markdown
{"status":"success","response":"OTP sent successfully."}
```

RESPONSE STATUS:

`200 OK`

    
D. VERIFY OTP

ENDPOINT:

`http://127.0.0.1:8000/merchantservice/email-phone-verification/`

PAYLOAD:

```markdown
payload = {
          email: "ken@gmail.com",
          email_otp: "087339",
          phone_otp: "929979"
        };
```

REQUEST BODY:

```markdown
requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        };
```

RESPONSE BODY:

```markdown
{
    "status": "success",
    "response": "Phone and Email verified successfully",
}
```

RESPONSE STATUS:

`202 ACCEPTED`
    

E. SIGN-IN MERCHANT

ENDPOINT:

`http://127.0.0.1:8000/merchantservice/merchant-login/`

PAYLOAD:

```markdown
payload = {
          email: "ken@gmail.com",
          password: "ken@124$"
        };
```

REQUEST BODY:

```markdown
requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        };
```

RESPONSE BODY:

```markdown
{ access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA1MzMzMzg2LCJpYXQiOjE3MDUzMjk3ODYsImp0aSI6ImYzOTc0NWMzY2FmNzQ2Yjk4Y2M0ZTA1YzhmZTgwMTlmIiwidXNlcl9pZCI6NX0.l6siV-JMLZu48B6umar4KxHU4GPkSy3dyvooneA31dI", refresh_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNTQxNjE4NiwiaWF0IjoxNzA1MzI5Nzg2LCJqdGkiOiJiZGQ0M2MwMzFlYzI0YjBhODE3NTM0ZTcwNzI3ZWFiNyIsInVzZXJfaWQiOjV9.u-OvBYiIPHnvRFhf_xUv7Thnx07lQFDsCZVzouRJ1IA",
​​
access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA1MzMzMzg2LCJpYXQiOjE3MDUzMjk3ODYsImp0aSI6ImYzOTc0NWMzY2FmNzQ2Yjk4Y2M0ZTA1YzhmZTgwMTlmIiwidXNlcl9pZCI6NX0.l6siV-JMLZu48B6umar4KxHU4GPkSy3dyvooneA31dI",
​​
refresh_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwNTQxNjE4NiwiaWF0IjoxNzA1MzI5Nzg2LCJqdGkiOiJiZGQ0M2MwMzFlYzI0YjBhODE3NTM0ZTcwNzI3ZWFiNyIsInVzZXJfaWQiOjV9.u-OvBYiIPHnvRFhf_xUv7Thnx07lQFDsCZVzouRJ1IA",
​​
user: Object { id: 5, first_name: "kennedy", is_superuser: false, … }
​​​}
```

RESPONSE STATUS:

`200 OK`