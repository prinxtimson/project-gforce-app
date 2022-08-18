@component('mail::message')
# Welcome To Blacky Restaurant

Hi {{ $user['firstname'] }},

Welcome to Blacky Restaurant. Find the following is your login details:

@component('mail::panel')
# Email: {{ $user['email'] }}
# Password: {{ $user['password'] }}
@endcomponent

@component('mail::button', ['url' => '', 'color' => 'success'])
Visit Website
@endcomponent

Thanks,<br>
Admin
@endcomponent