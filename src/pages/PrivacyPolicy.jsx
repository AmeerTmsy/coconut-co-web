import PolicyLayout from '../components/PolicyLayout'
import { PolicySection, PolicyList } from '../components/PolicySection'
import SEO from '../components/SEO'

function PrivacyPolicy() {
  return (
    <>
        <SEO title="Privacy Policy" url="/privacy-policy" />
        <PolicyLayout title="Privacy Policy" lastUpdated="1 January 2025">
          <PolicySection title="1. Introduction">
            <p>
              Coconut Co. Foods Pvt. Ltd. ("we", "our", or "us") is committed to protecting your personal information. This Privacy Policy explains what data we collect, how we use it, and your rights regarding that data when you use our website at coconutco.in.
            </p>
          </PolicySection>
    
          <PolicySection title="2. Information We Collect">
            <p>We collect the following types of information:</p>
            <PolicyList items={[
              'Account information: name, email address, and password when you register',
              'Contact information: phone number and delivery addresses you add to your account',
              'Order information: products purchased, payment method, order history',
              'Payment information: processed securely by Razorpay — we never store card details',
              'Communication data: messages you send us via the contact form',
              'Usage data: pages visited, time spent, browser type, and device information via analytics tools',
            ]} />
          </PolicySection>
    
          <PolicySection title="3. How We Use Your Information">
            <p>We use your information to:</p>
            <PolicyList items={[
              'Process and fulfil your orders',
              'Send order confirmations and shipping updates',
              'Respond to your enquiries and support requests',
              'Send promotional emails if you have opted in (you can unsubscribe anytime)',
              'Improve our website and product offerings through analytics',
              'Prevent fraud and maintain the security of our platform',
            ]} />
          </PolicySection>
    
          <PolicySection title="4. Sharing Your Information">
            <p>
              We do not sell your personal data to third parties. We share data only with:
            </p>
            <PolicyList items={[
              'Delivery partners (name, address, phone) to fulfil your orders',
              'Payment processors (Razorpay) to handle transactions securely',
              'Email and SMS service providers to send order updates',
              'Analytics providers (Google Analytics) in anonymised form',
            ]} />
          </PolicySection>
    
          <PolicySection title="5. Data Retention">
            <p>
              We retain your personal data for as long as your account is active or as needed to provide services. Order records are retained for 7 years as required by Indian tax law. You may request deletion of your account and personal data by contacting us at hello@coconutco.in.
            </p>
          </PolicySection>
    
          <PolicySection title="6. Cookies">
            <p>
              We use essential cookies to keep you logged in and remember your cart. We also use analytics cookies (Google Analytics) to understand how visitors use our site. You can disable cookies in your browser settings, though some features may not work correctly.
            </p>
          </PolicySection>
    
          <PolicySection title="7. Your Rights">
            <p>You have the right to:</p>
            <PolicyList items={[
              'Access the personal data we hold about you',
              'Correct inaccurate or incomplete data',
              'Request deletion of your data (subject to legal obligations)',
              'Opt out of marketing communications at any time',
              'Raise a complaint with the relevant data protection authority',
            ]} />
          </PolicySection>
    
          <PolicySection title="8. Security">
            <p>
              We use industry-standard security measures including SSL encryption, secure password hashing, and access controls to protect your data. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </PolicySection>
    
          <PolicySection title="9. Contact Us">
            <p>
              For any privacy-related questions or requests, please contact us at hello@coconutco.in or write to us at Coconut Co. Foods Pvt. Ltd., Thrissur, Kerala — 680001, India.
            </p>
          </PolicySection>
        </PolicyLayout>
    </>
  )
}

export default PrivacyPolicy