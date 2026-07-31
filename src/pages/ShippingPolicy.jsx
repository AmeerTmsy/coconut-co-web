import PolicyLayout from '../components/PolicyLayout'
import { PolicySection, PolicyList } from '../components/PolicySection'
import SEO from '../components/SEO'

function ShippingPolicy() {
    return (
        <>
            <SEO title="Shipping Policy" url="/shipping-policy" />
            <PolicyLayout title="Shipping Policy" lastUpdated="1 January 2025">
                <PolicySection title="1. Processing Time">
                    <p>
                        All orders are processed within 1–2 business days (Monday to Saturday, excluding public holidays). Orders placed after 2pm IST are processed the next business day. You will receive an email confirmation once your order has been dispatched.
                    </p>
                </PolicySection>

                <PolicySection title="2. Delivery Timeframes">
                    <PolicyList items={[
                        'Metro cities (Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Kolkata): 2–3 business days',
                        'Tier 2 cities: 3–4 business days',
                        'Tier 3 cities and remote areas: 4–7 business days',
                        'North-East India and Jammu & Kashmir: 5–9 business days',
                    ]} />
                    <p className="mt-3">
                        These are estimated timeframes and may vary due to courier delays, weather conditions, or public holidays.
                    </p>
                </PolicySection>

                <PolicySection title="3. Shipping Charges">
                    <PolicyList items={[
                        'Orders above ₹999: FREE shipping',
                        'Orders below ₹999: flat ₹49 shipping fee',
                        'No additional charges for remote areas — the flat fee applies everywhere',
                    ]} />
                </PolicySection>

                <PolicySection title="4. Courier Partners">
                    <p>
                        We ship via trusted courier partners including Delhivery, Blue Dart, and Shiprocket-enabled carriers. The courier assigned to your order depends on your pin code and availability at the time of dispatch.
                    </p>
                </PolicySection>

                <PolicySection title="5. Order Tracking">
                    <p>
                        Once your order is dispatched, you can track it from your Account page under "My Orders". Tracking information is updated as your order moves through the delivery network. You may also receive SMS/WhatsApp updates from the courier partner directly.
                    </p>
                </PolicySection>

                <PolicySection title="6. Failed Delivery Attempts">
                    <p>
                        If a delivery attempt fails (no one available at the address), the courier will typically make 2–3 attempts before returning the package to us. Please ensure your address and phone number are correct at checkout. If your order is returned to us due to a failed delivery, we will contact you to arrange re-delivery (additional shipping charges may apply).
                    </p>
                </PolicySection>

                <PolicySection title="7. Damaged in Transit">
                    <p>
                        If your order arrives damaged due to transit, please photograph the package and product immediately and email us at hello@coconutco.in within 48 hours. We will arrange a replacement or full refund promptly.
                    </p>
                </PolicySection>

                <PolicySection title="8. Shipping Restrictions">
                    <PolicyList items={[
                        'We currently ship within India only',
                        'Certain products may not be available for delivery to all pin codes',
                        'Cash on Delivery (COD) may not be available at all pin codes',
                    ]} />
                </PolicySection>

                <PolicySection title="9. Contact Us">
                    <p>
                        For any shipping-related queries, email us at hello@coconutco.in or call +91 98765 43210 (Mon–Sat, 9am–6pm IST).
                    </p>
                </PolicySection>
            </PolicyLayout>
        </>
    )
}

export default ShippingPolicy