import logo from "../assets/logo.png";

export default function Privacy() {
  return (
    <div
      style={{
        padding: "60px 30px",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <img src={logo} alt="Gishmaf Logo" style={{ width: "80px" }} />
        <h1>Privacy Policy</h1>
        <p style={{ color: "gray" }}>
          Last updated: September 2026
        </p>
      </div>

      <div
        style={{
          maxWidth: "900px",
          margin: "auto",
          lineHeight: "1.7",
          fontSize: "16px",
        }}
      >
        <h2>1. Introduction</h2>
        <p>
          Welcome to Gishmaf. Your privacy is important to us. This Privacy
          Policy explains how we collect, use, protect, and share information
          when you use our website and our applications, including GishTube.
        </p>

        <h2>2. Information We Collect</h2>

        <h3>Personal Information</h3>
        <p>
          When you create an account, make a purchase, subscribe to a service,
          or contact us, we may collect information such as:
        </p>
        <ul>
          <li>Name or username</li>
          <li>Email address</li>
          <li>Profile information you choose to provide</li>
          <li>Information required to provide requested services</li>
        </ul>

        <h3>Website Usage Information</h3>
        <p>
          We may collect information about how visitors use our website,
          including usage data, pages visited, cookies, and related technical
          information.
        </p>

        <h3>App Usage Information</h3>
        <p>
          Our applications, including GishTube, may automatically collect
          information such as:
        </p>
        <ul>
          <li>App usage data</li>
          <li>Pages and screens viewed</li>
          <li>Search and viewing activity</li>
          <li>Device type and operating system version</li>
          <li>Crash logs and diagnostic information</li>
          <li>IP address</li>
          <li>Advertising ID or similar device advertising identifier</li>
        </ul>

        <h3>Media and Streaming Data</h3>
        <p>
          GishTube may record viewing interactions such as videos watched,
          watch history, and favorites or saved content.
        </p>

        <h2>3. Advertising and Monetization</h2>
        <p>
          GishTube may use third-party advertising and monetization services,
          including Appodeal, to display advertisements within the application.
        </p>

        <p>
          Advertising and monetization providers may collect information such
          as IP address, advertising identifiers, device information, usage
          information, and other information necessary to provide, measure, and
          improve advertising services.
        </p>

        <p>
          For information about how Appodeal processes information, please
          review the{" "}
          <a
            href="https://www.appodeal.com/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Appodeal Privacy Policy
          </a>
          .
        </p>

        <h2>4. Google AdSense and Cookies</h2>
        <p>
          Our website may use Google AdSense and cookies to display
          advertisements and provide relevant advertising. Advertising
          providers may use cookies, web beacons, or similar technologies to
          collect information and provide personalized advertisements where
          permitted.
        </p>

        <p>
          Users in jurisdictions where consent is required may be asked to
          provide consent before certain personalized advertising technologies
          are used.
        </p>

        <h2>5. Payments</h2>
        <p>
          Payments for books, premium subscriptions, and other applicable
          purchases may be securely processed through Stripe. We do not store
          your full payment-card details on our servers.
        </p>

        <h2>6. How We Use Information</h2>
        <p>We may use collected information to:</p>
        <ul>
          <li>Provide and operate our website and applications</li>
          <li>Provide account and profile functionality</li>
          <li>Provide purchased books and premium services</li>
          <li>Improve user experience and application performance</li>
          <li>Fix bugs and technical problems</li>
          <li>Monitor service stability and security</li>
          <li>Display, measure, and improve advertisements</li>
          <li>Communicate important service updates</li>
        </ul>

        <h2>7. Third-Party Services</h2>
        <p>
          We may use trusted third-party services to provide and support
          features of our website and applications. These services may process
          information according to their own privacy policies.
        </p>

        <p>These services may include:</p>
        <ul>
          <li>Authentication providers</li>
          <li>Cloud hosting services</li>
          <li>Payment providers such as Stripe</li>
          <li>Analytics and diagnostic services</li>
          <li>Video or trailer providers</li>
          <li>Advertising and monetization providers such as Appodeal</li>
        </ul>

        <h2>8. Data Sharing</h2>
        <p>
          We do not sell your personal data.
        </p>

        <p>
          We may share limited information when necessary to:
        </p>
        <ul>
          <li>Provide app or website functionality through service providers</li>
          <li>Provide and measure advertising services</li>
          <li>Process payments and purchases</li>
          <li>Comply with legal obligations</li>
          <li>Protect our rights and prevent abuse</li>
        </ul>

        <h2>9. Consent and Advertising Choices</h2>
        <p>
          Where required by applicable law, we may request your consent before
          certain personal information is used for personalized advertising or
          other purposes requiring consent.
        </p>

        <p>
          You may also have choices regarding advertising identifiers and
          personalized advertising through consent options presented in our
          applications and/or through your device settings.
        </p>

        <h2>10. Data Security</h2>
        <p>
          We use reasonable technical and organizational safeguards to protect
          information. However, no internet transmission or storage system can
          be guaranteed to be completely secure.
        </p>

        <h2>11. Data Retention</h2>
        <p>
          We retain information only for as long as reasonably necessary to
          provide our services, fulfill legitimate business purposes, meet
          legal requirements, and resolve disputes.
        </p>

        <h2>12. Children's Privacy</h2>
        <p>
          GishTube and our services are not intended for children under 13. We
          do not knowingly collect personal information from children. If we
          become aware that such information has been collected, we will take
          reasonable steps to delete it.
        </p>

        <h2>13. Your Rights</h2>
        <p>
          Depending on your location and applicable law, you may have rights to
          access, correct, delete, or request information about your personal
          data and to withdraw consent where applicable.
        </p>

        <h2>14. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any updates will
          be published on this page with a new effective or updated date.
        </p>

        <h2>15. Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy or our privacy
          practices, please contact us:
        </p>

        <div
          style={{
            marginTop: "20px",
            background: "#f4f4f4",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <strong>Email:</strong>{" "}
          <a href="mailto:gishmafglobal@gmail.com">
            gishmafglobal@gmail.com
          </a>
          <br />
          <strong>Developer:</strong> Gishmaf Global
        </div>

        <p style={{ marginTop: "40px", color: "gray" }}>
          End of Privacy Policy
        </p>
      </div>
    </div>
  );
}
