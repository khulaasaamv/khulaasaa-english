"use client";

import { useState } from "react";

const contentMap = {
  about: {
    title: "About Us",
    body: (
      <>
        <p>
          Khulaasaa is a digital news and media platform committed to delivering timely,
          clear, and reliable news to readers in the Maldives and beyond.
        </p>

        <p>
          Our purpose is to make important information easy to understand. We cover
          national news, politics, business, sports, world affairs, lifestyle,
          entertainment, technology, and other stories that matter to our readers.
        </p>

        <p>
          Khulaasaa aims to present news in a compact, modern, and accessible format
          while maintaining journalistic responsibility. We believe readers deserve
          news that is fast, factual, and easy to follow.
        </p>

        <p>
          Our team works to verify information before publication, provide context
          where needed, and update stories when new information becomes available.
          We also value responsible public discussion and aim to serve as a platform
          that informs, connects, and reflects society.
        </p>

        <p>
          For general inquiries, news tips, partnerships, or feedback, readers may
          contact us through our official email and social media channels.
        </p>
      </>
    ),
  },

  privacy: {
    title: "Privacy Policy",
    body: (
      <>
        <p>
          Khulaasaa respects the privacy of its readers, visitors, contributors,
          advertisers, and partners.
        </p>

        <p>
          When you visit our website, we may collect limited information such as
          general website usage data, device type, browser type, pages visited, and
          interaction with our content. This information helps us understand how
          readers use our website and improve our services.
        </p>

        <p>
          If you contact Khulaasaa by email, WhatsApp, social media, or through any
          future contact form, we may receive personal information such as your name,
          phone number, email address, message content, or other details you choose
          to provide. This information will only be used to respond to your inquiry,
          manage communication, provide requested services, or improve our work.
        </p>

        <p>
          Khulaasaa does not sell personal information to third parties. We do not
          intentionally share private user information except where required for
          website operation, legal compliance, safety, business communication, or
          service improvement.
        </p>

        <p>
          Our website may include links to external websites, social media platforms,
          embedded content, or third-party services. Khulaasaa is not responsible for
          the privacy practices, content, or policies of external websites. Readers
          are advised to review the privacy policies of those platforms separately.
        </p>

        <p>
          We may use analytics, cookies, or similar technologies to improve website
          performance and reader experience. Users may manage cookies through their
          browser settings.
        </p>

        <p>
          By using Khulaasaa, you agree to this privacy policy. This policy may be
          updated from time to time, and any changes will be reflected on our website.
        </p>
      </>
    ),
  },

  editorial: {
    title: "Editorial Policy",
    body: (
      <>
        <p>
          Khulaasaa is committed to responsible, accurate, and fair journalism.
        </p>

        <p>
          Our editorial work is guided by the principles of accuracy, balance,
          independence, public interest, and accountability. We aim to publish
          information that is verified, relevant, and presented in a clear manner.
        </p>

        <p>
          Before publishing news, Khulaasaa makes reasonable efforts to confirm facts
          from reliable sources. Where information is developing or not fully
          confirmed, we aim to make that clear to readers.
        </p>

        <p>
          We strive to separate news reporting from opinion, advertising, sponsored
          content, and promotional material. When content is sponsored, promotional,
          or produced in partnership with an advertiser, we aim to label it
          appropriately where required.
        </p>

        <p>
          Khulaasaa may update, correct, or clarify published articles if errors are
          identified or if new information becomes available. We believe corrections
          are an important part of maintaining trust with readers.
        </p>

        <p>
          Our editorial team may decide not to publish content that is misleading,
          defamatory, hateful, harmful, invasive of privacy, legally risky, or
          against responsible journalistic standards.
        </p>

        <p>
          Readers, institutions, and individuals may contact Khulaasaa to request
          corrections, clarifications, or responses regarding published content.
          Such requests will be reviewed by the editorial team.
        </p>

        <p>
          Khulaasaa remains committed to serving the public with timely news while
          respecting truth, fairness, and responsible media practice.
        </p>
      </>
    ),
  },

  advertise: {
    title: "Advertise",
    body: (
      <>
        <p>
          Khulaasaa offers advertising, sponsorship, and media partnership
          opportunities for businesses, institutions, government bodies, NGOs,
          events, and brands seeking to reach an engaged Maldivian audience.
        </p>

        <p>
          Advertising opportunities may include website banner placements, article
          page advertisements, social media promotions, sponsored articles,
          advertorials, campaign coverage, video content, event coverage,
          photography, and customized media packages.
        </p>

        <p>
          Our advertising team can work with partners to create campaigns that fit
          their goals, target audience, budget, and preferred platforms.
        </p>

        <p>
          Sponsored or paid promotional content may be labelled where appropriate
          to maintain transparency with readers. Khulaasaa reserves the right to
          reject advertisements or sponsored content that conflicts with our
          standards, legal requirements, public interest, or brand values.
        </p>

        <p>
          For advertising inquiries, sponsorship packages, rate cards, and campaign
          proposals, please contact:
        </p>

        <p>
          <a href="mailto:marketing@khulaasaa.com">
            marketing@khulaasaa.com
          </a>
        </p>

        <p>
          Our team will respond with available options and recommended placements
          based on your requirements.
        </p>
      </>
    ),
  },

  terms: {
    title: "Terms",
    body: (
      <>
        <p>
          By accessing or using the Khulaasaa website, you agree to use our platform
          responsibly and in accordance with these terms.
        </p>

        <p>
          All content published on Khulaasaa, including articles, images, videos,
          graphics, logos, design elements, and branding, is owned by Khulaasaa or
          used with permission, unless otherwise stated. Users may not copy,
          reproduce, republish, modify, distribute, or commercially use our content
          without prior permission.
        </p>

        <p>
          Readers may share article links through social media, messaging platforms,
          and other channels, provided that the original Khulaasaa link and
          attribution remain intact.
        </p>

        <p>
          Users must not misuse the website, attempt to damage its systems, interfere
          with services, submit harmful content, or use the platform for illegal,
          abusive, misleading, or harmful activities.
        </p>

        <p>
          Khulaasaa may include links to external websites or third-party platforms.
          We are not responsible for the content, availability, accuracy, or policies
          of external websites.
        </p>

        <p>
          Khulaasaa may update, modify, remove, or correct content at any time. We
          may also update these terms when necessary.
        </p>

        <p>
          While we aim to provide accurate and timely information, Khulaasaa does
          not guarantee that all content will always be complete, error-free, or
          continuously available. Readers are encouraged to verify important
          information, especially where decisions may depend on official, legal,
          financial, or medical details.
        </p>

        <p>
          By continuing to use Khulaasaa, you agree to these terms.
        </p>
      </>
    ),
  },
};

export default function FooterPolicyModal() {
  const [openModal, setOpenModal] = useState(null);

  const closeModal = () => setOpenModal(null);

  return (
    <>
      <nav className="footer-policy-links">
        <button onClick={() => setOpenModal("about")}>
          About Us
        </button>

        <button onClick={() => setOpenModal("privacy")}>
          Privacy Policy
        </button>

        <button onClick={() => setOpenModal("editorial")}>
          Editorial Policy
        </button>

        <button onClick={() => setOpenModal("advertise")}>
          Advertise
        </button>

        <button onClick={() => setOpenModal("terms")}>
          Terms
        </button>
      </nav>

      {openModal && (
        <div
          className="policy-modal-backdrop"
          onClick={closeModal}
        >
          <div
            className="policy-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="policy-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="policy-modal-header">
              <h2 id="policy-modal-title">
                {contentMap[openModal].title}
              </h2>

              <button
                className="policy-modal-close"
                onClick={closeModal}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="policy-modal-content">
              {contentMap[openModal].body}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
