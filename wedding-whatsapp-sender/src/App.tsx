import { useState } from "react";
import { CheckCircle2, Heart, Send } from "lucide-react";

import { InvitationForm } from "./components/InvitationForm";
import { InvitationPreview } from "./components/InvitationPreview";

import type { InvitationData } from "./types/invitation";

const DEFAULT_INVITATION_URL =
  "https://yourdomain.com/wedding-invitation/#/invite";

function App() {
  const [data, setData] = useState<InvitationData>({
    phoneNumber: "",
    slug: "",
    invitationUrl: DEFAULT_INVITATION_URL,
    quote: "Two hearts, one beautiful journey...",
    description:
      "We would be delighted to have you with us as we celebrate our special day.",
  });

  const [sent, setSent] = useState(false);

  const finalInvitationUrl =
    data.slug.trim() && data.invitationUrl.trim()
      ? `${data.invitationUrl.replace(/\/+$/, "")}/${data.slug}`
      : data.invitationUrl;

  const handleSend = () => {
    setSent(true);

    window.setTimeout(() => {
      setSent(false);
    }, 3000);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="brand">
            <div className="brand-icon">
              <Heart size={22} fill="currentColor" />
            </div>

            <div>
              <h1>Wedding Invitation Sender</h1>
              <p>Send beautiful invitations on WhatsApp</p>
            </div>
          </div>

          <div className="free-badge">
            <CheckCircle2 size={16} />
            Free
          </div>
        </div>
      </header>

      <main className="main">
        <div className="intro">
          <span className="eyebrow">WEDDING INVITATION</span>

          <h2>
            Send your invitation
            <br />
            <span>with love ❤️</span>
          </h2>

          <p>
            Enter the recipient&apos;s WhatsApp number and invitation
            details to prepare your personalized wedding invitation.
          </p>
        </div>

        <div className="content-grid">
          <InvitationForm
            data={data}
            onChange={setData}
          />

          <InvitationPreview
            data={data}
            onSend={handleSend}
          />
        </div>

        {sent && (
          <div className="success-message">
            <CheckCircle2 size={20} />

            <span>
              WhatsApp has been opened with the invitation
              message ready to send.
            </span>
          </div>
        )}

        <div className="link-preview">
          <div className="link-preview-heading">
            <Send size={18} />
            <span>Generated Invitation Link</span>
          </div>

          <div className="generated-link">
            {finalInvitationUrl}
          </div>
        </div>
      </main>

      <footer className="footer">
        <Heart size={14} fill="currentColor" />

        <span>Made with love for your special day</span>
      </footer>
    </div>
  );
}

export default App;