import PolicyLayout from '../components/PolicyLayout'
import { PolicySection, PolicyList } from '../components/PolicySection'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

function Terms() {
    return (
        <>
            <SEO title="Terms & Conditions" url="/terms" />
            <PolicyLayout title="Terms & Conditions" lastUpdated="1 January 2025">
                <PolicySection title="1. Acceptance of Terms">
                    <p>
                        By accessing or using the Coconut Co. website (coconutco.in) and placing orders, you agree to be bound by these Terms & Conditions. If you do not agree to these terms, please do not use our website.
                    </p>
                </PolicySection>

                <PolicySection title="2. About Us">
                    <p>
                        Coconut Co. Foods Pvt. Ltd. is a company registered in India, operating an e-commerce platform for the sale of coconut-based food and wellness products. Our registered address is Thrissur, Kerala — 680001, India.
                    </p>
                </PolicySection>

                <PolicySection title="3. Products & Pricing">
                    <PolicyList items={[
                        'All prices are listed in Indian Rupees (₹) and are inclusive of applicable GST',
                        'We reserve the right to change prices at any time without prior notice',
                        'Product images are for illustrative purposes — actual appearance may vary slightly',
                        'We reserve the right to limit quantities or refuse orders at our discretion',
                        'In the event of a pricing error, we will contact you before processing your order',
                    ]} />
                </PolicySection>

                <PolicySection title="4. Orders & Payment">
                    <PolicyList items={[
                        'Placing an order constitutes an offer to purchase — it is not a confirmed sale until we send an order confirmation',
                        'We reserve the right to cancel orders in cases of stock unavailability, pricing errors, or suspected fraud',
                        'Payment must be completed at the time of placing the order (except for COD)',
                        'For COD orders, payment is due at the time of delivery',
                        'We use Razorpay for secure payment processing — your card and payment details are never stored on our servers',
                    ]} />
                </PolicySection>

                <PolicySection title="5. Delivery">
                    <p>
                        Delivery timeframes are estimates and not guaranteed. We are not liable for delays caused by courier partners, weather conditions, or events beyond our control. Please refer to our{' '}
                        <Link to="/shipping-policy" className="text-leaf-600 hover:underline">Shipping Policy</Link>
                        {' '}for full details.
                    </p>
                </PolicySection>

                <PolicySection title="6. Returns & Refunds">
                    <p>
                        Returns and refunds are governed by our{' '}
                        <Link to="/refund-policy" className="text-leaf-600 hover:underline">Refund & Return Policy</Link>.
                        {' '}By placing an order, you agree to the terms of that policy.
                    </p>
                </PolicySection>

                <PolicySection title="7. User Accounts">
                    <PolicyList items={[
                        'You are responsible for maintaining the confidentiality of your account credentials',
                        'You must notify us immediately of any unauthorised use of your account',
                        'You must provide accurate and complete information when creating an account',
                        'We reserve the right to suspend or terminate accounts that violate these terms',
                    ]} />
                </PolicySection>

                <PolicySection title="8. Intellectual Property">
                    <p>
                        All content on this website — including text, images, logos, product descriptions, and design — is the property of Coconut Co. Foods Pvt. Ltd. and is protected by applicable intellectual property laws. You may not reproduce, distribute, or use our content without written permission.
                    </p>
                </PolicySection>

                <PolicySection title="9. Limitation of Liability">
                    <p>
                        To the maximum extent permitted by law, Coconut Co. shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website. Our liability for any claim shall not exceed the value of the order in question.
                    </p>
                </PolicySection>

                <PolicySection title="10. Governing Law">
                    <p>
                        These Terms & Conditions are governed by the laws of India. Any disputes arising shall be subject to the exclusive jurisdiction of the courts of Thrissur, Kerala.
                    </p>
                </PolicySection>

                <PolicySection title="11. Changes to These Terms">
                    <p>
                        We reserve the right to update these Terms & Conditions at any time. Changes will be effective upon posting to this page. Continued use of our website after changes constitutes acceptance of the updated terms.
                    </p>
                </PolicySection>

                <PolicySection title="12. Contact Us">
                    <p>
                        For any questions about these Terms, please contact us at hello@coconutco.in or write to Coconut Co. Foods Pvt. Ltd., Thrissur, Kerala — 680001, India.
                    </p>
                </PolicySection>
            </PolicyLayout>
        </>
    )
}

export default Terms