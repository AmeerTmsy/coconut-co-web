import PolicyLayout from '../components/PolicyLayout'
import { PolicySection, PolicyList } from '../components/PolicySection'
import SEO from '../components/SEO'

function RefundPolicy() {
    return (
        <>
            <SEO title="Refund & Return Policy" url="/refund-policy" />
            <PolicyLayout title="Refund & Return Policy" lastUpdated="1 January 2025">
                <PolicySection title="Overview">
                    <p>
                        We want you to be completely satisfied with your purchase. If something isn't right, we're here to make it right. Please read this policy carefully before raising a return or refund request.
                    </p>
                </PolicySection>

                <PolicySection title="1. Eligibility for Returns">
                    <p>We accept return requests in the following situations:</p>
                    <PolicyList items={[
                        'Product received is damaged or broken',
                        'Product received is defective (e.g. spoiled, leaking, wrong product)',
                        'Product is significantly different from what was described on the website',
                    ]} />
                    <p className="mt-3">We do not accept returns for:</p>
                    <PolicyList items={[
                        'Opened food products (unless defective)',
                        'Products returned after 7 days of delivery',
                        'Products damaged due to misuse or improper storage by the customer',
                        'Change of mind purchases',
                    ]} />
                </PolicySection>

                <PolicySection title="2. How to Request a Return">
                    <p>To initiate a return:</p>
                    <PolicyList items={[
                        'Log in to your account and go to "My Orders"',
                        'Select the order and click "Request Return"',
                        'Describe the issue and attach a photo if the product is damaged or defective',
                        'Our team will review your request within 24 hours',
                        'If approved, we will arrange a pickup within 2–3 business days',
                    ]} />
                    <p className="mt-3">
                        Alternatively, email us at hello@coconutco.in with your order number and a description of the issue. For damaged products, please send photos within 48 hours of receiving the order.
                    </p>
                </PolicySection>

                <PolicySection title="3. Refund Process">
                    <PolicyList items={[
                        'Once we receive and inspect the returned product, we will notify you of the approval or rejection of your refund',
                        'Approved refunds are processed within 5–7 business days',
                        'Online payments (UPI, card, netbanking) are refunded to the original payment method',
                        'Cash on Delivery (COD) orders are refunded via NEFT bank transfer — we will request your bank details',
                        'Shipping charges are non-refundable unless the return is due to our error',
                    ]} />
                </PolicySection>

                <PolicySection title="4. Replacement Option">
                    <p>
                        Instead of a refund, you may opt for a replacement of the same product. Replacements are dispatched within 2–3 business days of the returned product being received and verified by us.
                    </p>
                </PolicySection>

                <PolicySection title="5. Order Cancellations">
                    <p>
                        You can cancel an order from your Account page as long as the order status is "Placed" or "Confirmed". Once your order has been packed or shipped, cancellation is no longer possible.
                    </p>
                    <p className="mt-3">
                        For pre-paid orders that are cancelled before dispatch, the full amount is refunded within 5–7 business days to your original payment method.
                    </p>
                </PolicySection>

                <PolicySection title="6. Contact Us">
                    <p>
                        For any return or refund queries, please reach us at hello@coconutco.in or call us at +91 98765 43210 (Mon–Sat, 9am–6pm IST).
                    </p>
                </PolicySection>
            </PolicyLayout>
        </>
    )
}

export default RefundPolicy