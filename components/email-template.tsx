import * as React from 'react'; 

interface EmailTemplateProps {
  Name: string;
  Email: string;
  Message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  Name,
  Email,
  Message,
}) => (
  <div>
    <h1>Name, {Name}!</h1>
    <h1>Email, {Email}!</h1>
    <p>Message, {Message}!</p>
  </div>
);
