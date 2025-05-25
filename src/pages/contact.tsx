// src/pages/contact.tsx
export default function Contact() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <form className="w-full max-w-md space-y-4">
                <input className="w-full border p-2 rounded" type="text" placeholder="Name" />
                <input className="w-full border p-2 rounded" type="email" placeholder="Email" />
                <textarea className="w-full border p-2 rounded" rows={4} placeholder="Message" />
                <button className="w-full bg-blue-600 text-white py-2 rounded">Send</button>
            </form>
        </div>
    )
}