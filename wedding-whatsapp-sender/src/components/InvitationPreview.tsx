import { ExternalLink, Heart } from "lucide-react";

import type { InvitationData } from "../types/invitation";

import { WhatsAppButton } from "./WhatsAppButton";

import weddingImage from "../assets/wedding-preview.jpeg";

interface InvitationPreviewProps {
  data: InvitationData;
  onSend: () => void;
}

export function InvitationPreview({
  data,
  onSend,
}: InvitationPreviewProps) {
  /**
   * Create final personalized invitation URL.
   *
   * Example:
   *
   * Base:
   * https://yourdomain.com/wedding-invitation/#/invite
   *
   * Slug:
   * kasun
   *
   * Result:
   * https://yourdomain.com/wedding-invitation/#/invite/kasun
   */
  const finalInvitationUrl =
    data.slug.trim() && data.invitationUrl.trim()
      ? `${data.invitationUrl.replace(/\/+$/, "")}/${data.slug}`
      : data.invitationUrl;

  return (
    <div className="preview-card">
      {/* ================= PREVIEW HEADER ================= */}

      <div className="preview-header">
        <div>
          <span className="preview-label">
            LIVE PREVIEW
          </span>

          <h2>WhatsApp Invitation</h2>
        </div>

        <Heart
          size={22}
          fill="currentColor"
          className="heart-icon"
        />
      </div>

      {/* ================= PHONE PREVIEW ================= */}

      <div className="phone-preview">
        <div className="phone-top">
          <span>Wedding Invitation</span>
        </div>

        <div className="whatsapp-message">
          {/* Wedding Photo */}

          <img
            src={weddingImage}
            alt="Wedding"
            className="wedding-photo"
          />

          {/* Message Content */}

          <div className="message-content">
            {/* Quote */}

            <div className="quote">
              "{data.quote || "Your wedding quote"}"
            </div>

            {/* Description */}

            <p className="description">
              {data.description ||
                "Your wedding invitation description will appear here."}
            </p>

            {/* Invitation Link */}

            <div className="invitation-link">
              <div className="link-icon">
                <ExternalLink size={15} />
              </div>

              <div>
                <span>Wedding Invitation</span>

                <strong>
                  {finalInvitationUrl ||
                    "Your invitation link"}
                </strong>
              </div>
            </div>

            {/* Footer Message */}

            <div className="message-footer">
              We would be delighted to celebrate
              this special day with you. ❤️
            </div>
          </div>
        </div>
      </div>

      {/* ================= WHATSAPP BUTTON ================= */}

      <WhatsAppButton
        phoneNumber={data.phoneNumber}
        quote={data.quote}
        description={data.description}
        invitationUrl={finalInvitationUrl}
        onSend={onSend}
      />

      {/* ================= NOTE ================= */}

      <p className="whatsapp-note">
        WhatsApp Web will open with the invitation
        message ready to send.
      </p>
    </div>
  );
}