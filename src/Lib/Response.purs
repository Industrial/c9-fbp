module Lib.HTTPResponse where

import Prelude

import Data.Maybe (Maybe(..))
import Data.Tuple (Tuple(..))
import FFI.Server (Headers, RequestHandler, createResponse)

locationHeader :: String -> Tuple String String
locationHeader location = (Tuple "Location" location)

contentTypeHeader :: String -> Tuple String String
contentTypeHeader contentType = Tuple "Content-Type" contentType

jsonContentTypeHeader :: Tuple String String
jsonContentTypeHeader = contentTypeHeader "application/json"

-- 2xx
-- 200 OK
-- Standard response for successful HTTP requests. The actual response will
-- depend on the request method used. In a GET request, the response will
-- contain an entity corresponding to the requested resource. In a POST request,
-- the response will contain an entity describing or containing the result of
-- the action.
ok :: String -> Headers -> RequestHandler
ok bodyString headers _ =
  pure $ createResponse
    bodyString
    (Just headers)
    (Just 200)
    (Just "OK")

-- 201 Created
-- The request has been fulfilled, resulting in the creation of a new resource.
created :: String -> Headers -> RequestHandler
created bodyString headers _ =
  pure $ createResponse
    bodyString
    (Just headers)
    (Just 201)
    (Just "Created")

-- 202 Accepted
-- The request has been accepted for processing, but the processing has not been
-- completed. The request might or might not be eventually acted upon, and may
-- be disallowed when processing occurs.
accepted :: String -> Headers -> RequestHandler
accepted bodyString headers _ =
  pure $ createResponse
    bodyString
    (Just headers)
    (Just 202)
    (Just "Accepted")

-- 203 Non-Authorative Information
-- The server is a transforming proxy (e.g. a Web accelerator) that received a
-- 200 OK from its origin, but is returning a modified version of the origin's
-- response.
nonAuthorativeInformation :: String -> Headers -> RequestHandler
nonAuthorativeInformation bodyString headers _ =
  pure $ createResponse
    bodyString
    (Just headers)
    (Just 203)
    (Just "Non-Authorative Information")

-- 204 No Content
-- The server successfully processed the request, and is not returning any
-- content.
noContent :: String -> Headers -> RequestHandler
noContent bodyString headers _ =
  pure $ createResponse
    bodyString
    (Just headers)
    (Just 204)
    (Just "No Content")

-- 205 Reset Content
-- The server successfully processed the request, asks that the requester reset
-- its document view, and is not returning any content.
resetContent :: String -> Headers -> RequestHandler
resetContent bodyString headers _ =
  pure $ createResponse
    bodyString
    (Just headers)
    (Just 205)
    (Just "Reset Content")

-- 206 Partial Content
-- The server is delivering only part of the resource (byte serving) due to a
-- range header sent by the client. The range header is used by HTTP clients to
-- enable resuming of interrupted downloads, or split a download into multiple
-- simultaneous streams.
partialContent :: String -> Headers -> RequestHandler
partialContent bodyString headers _ =
  pure $ createResponse
    bodyString
    (Just headers)
    (Just 206)
    (Just "Partial Content")

-- 207 Multi-Status (WebDAV; RFC 4918)
-- The message body that follows is by default an XML message and can contain a
-- number of separate response codes, depending on how many sub-requests were
-- made.
multiStatus :: String -> Headers -> RequestHandler
multiStatus bodyString headers _ =
  pure $ createResponse
    bodyString
    (Just headers)
    (Just 207)
    (Just "Multi-Status")

-- 208 Already Reported (WebDAV; RFC 5842)
-- The members of a DAV binding have already been enumerated in a preceding part
-- of the (multistatus) response, and are not being included again.
alreadyReported :: String -> Headers -> RequestHandler
alreadyReported bodyString headers _ =
  pure $ createResponse
    bodyString
    (Just headers)
    (Just 208)
    (Just "Already Reported")

-- 226 IM Used (RFC 3229)
-- The server has fulfilled a request for the resource, and the response is a
-- representation of the result of one or more instance-manipulations applied to
-- the current instance.
imUsed :: String -> Headers -> RequestHandler
imUsed bodyString headers _ =
  pure $ createResponse
    bodyString
    (Just headers)
    (Just 226)
    (Just "IM Used")

-- 3xx
-- 300 Multiple Choices
-- Indicates multiple options for the resource from which the client may choose
-- (via agent-driven content negotiation). For example, this code could be used
-- to present multiple video format options, to list files with different
-- filename extensions, or to suggest word-sense disambiguation.
multipleChoices :: String -> Headers -> RequestHandler
multipleChoices bodyString headers _ =
  pure $ createResponse
    bodyString
    (Just headers)
    (Just 300)
    (Just "Multiple Choices")

-- 301 Moved Permanently
-- This and all future requests should be directed to the given URI.
movedPermanently :: Headers -> RequestHandler
movedPermanently headers _ =
  pure $ createResponse
    ""
    (Just headers)
    (Just 301)
    (Just "Moved Permanently")

-- 302 Found
-- Tells the client to look at (browse to) another URL. The HTTP/1.0
-- specification required the client to perform a temporary redirect with the
-- same method (the original describing phrase was "Moved Temporarily"), but
-- popular browsers implemented 302 redirects by changing the method to GET.
-- Therefore, HTTP/1.1 added status codes 303 and 307 to distinguish between the
-- two behaviours.
found :: Headers -> RequestHandler
found headers _ =
  pure $ createResponse
    ""
    (Just headers)
    (Just 302)
    (Just "Found")

-- 303 See Other
-- The response to the request can be found under another URI using the GET
-- method.  When received in response to a POST (or PUT/DELETE), the client
-- should presume that the server has received the data and should issue a new
-- GET request to the given URI.
seeOther :: Headers -> RequestHandler
seeOther headers _ =
  pure $ createResponse
    ""
    (Just headers)
    (Just 303)
    (Just "See Other")

-- 304 Not Modified
-- Indicates that the resource has not been modified since the version specified
-- by the request headers If-Modified-Since or If-None-Match. In such case,
-- there is no need to retransmit the resource since the client still has a
-- previously-downloaded copy.
notModified :: Headers -> RequestHandler
notModified headers _ =
  pure $ createResponse
    ""
    (Just headers)
    (Just 304)
    (Just "Not Modified")

-- 305 use Proxy
-- The requested resource is available only through a proxy, the address for
-- which is provided in the response. For security reasons, many HTTP clients
-- (such as Mozilla Firefox and Internet Explorer) do not obey this status code.
useProxy :: Headers -> RequestHandler
useProxy headers _ =
  pure $ createResponse
    ""
    (Just headers)
    (Just 305)
    (Just "use Proxy")

-- 306 Switch Proxy
-- No longer used. Originally meant "Subsequent requests should use the
-- specified proxy.
switchProxy :: Headers -> RequestHandler
switchProxy headers _ =
  pure $ createResponse
    ""
    (Just headers)
    (Just 306)
    (Just "Switch Proxy")

-- 308 Permanent Redirect
-- This and all future requests should be directed to the given URI.  308
-- parallel the behaviour of 301, but does not allow the HTTP method to change.
-- So, for example, submitting a form to a permanently redirected resource may
-- continue smoothly.
permanentRedirect :: Headers -> RequestHandler
permanentRedirect headers _ =
  pure $ createResponse
    ""
    (Just headers)
    (Just 308)
    (Just "Permanent Redirect")

-- 4xx
-- 400 Bad Request
-- The server cannot or will not process the request due to an apparent client
-- error (e.g., malformed request syntax, size too large, invalid request
-- message framing, or deceptive request routing).
badRequest :: Headers -> RequestHandler
badRequest headers _ =
  pure $ createResponse
    ""
    (Just headers)
    (Just 400)
    (Just "Bad Request")

-- 401 Unauthorized
-- Similar to 403 Forbidden, but specifically for use when authentication is
-- required and has failed or has not yet been provided. The response must
-- include a WWW-Authenticate header field containing a challenge applicable to
-- the requested resource.
unauthorized :: Headers -> RequestHandler
unauthorized headers _ =
  pure $ createResponse
    ""
    (Just headers)
    (Just 401)
    (Just "Unauthorized")

-- 402 Payment Required
-- Reserved for future use. The original intention was that this code might be
-- used as part of some form of digital cash or micropayment scheme, as
-- proposed, for example, by GNU Taler, but that has not yet happened, and this
-- code is not widely used.
paymentRequired :: Headers -> RequestHandler
paymentRequired headers _ =
  pure $ createResponse
    ""
    (Just headers)
    (Just 402)
    (Just "Payment Required")

-- 404 Not Found
-- The requested resource could not be found but may be available in the future.
-- Subsequent requests by the client are permissible.
notFound :: Headers -> RequestHandler
notFound headers _ =
  pure $ createResponse
    ""
    (Just headers)
    (Just 404)
    (Just "Not Found")

-- 405 Method Not Allowed
-- A request method is not supported for the requested resource; for example, a
-- GET request on a form that requires data to be presented via POST, or a PUT
-- request on a read-only resource.
methodNotAllowed :: Headers -> RequestHandler
methodNotAllowed headers _ =
  pure $ createResponse
    ""
    (Just headers)
    (Just 405)
    (Just "Method Not Allowed")

-- 406 Not Acceptable
-- The requested resource is capable of generating only content not acceptable
-- according to the Accept headers sent in the request. See Content negotiation.
notAcceptable :: Headers -> RequestHandler
notAcceptable headers _ =
  pure $ createResponse
    ""
    (Just headers)
    (Just 406)
    (Just "Not Acceptable")

-- 407 Proxy Authentication Required
-- The client must first authenticate itself with the proxy.
proxyAuthenticationRequired :: Headers -> RequestHandler
proxyAuthenticationRequired headers _ =
  pure $ createResponse
    ""
    (Just headers)
    (Just 407)
    (Just "Proxy Authentication Required")

-- 408 Request Timeout
-- The server timed out waiting for the request. According to HTTP
-- specifications: "The client did not produce a request within the time that
-- the server was prepared to wait.  The client MAY repeat the request without
-- modifications at any later time."
requestTimeout :: Headers -> RequestHandler
requestTimeout headers _ =
  pure $ createResponse
    ""
    (Just headers)
    (Just 408)
    (Just "Request Timeout")

-- 409 Conflict
-- Indicates that the request could not be processed because of conflict in the
-- current state of the resource, such as an edit conflict between multiple
-- simultaneous updates.
conflict :: Headers -> RequestHandler
conflict headers _ =
  pure $ createResponse
    ""
    (Just headers)
    (Just 409)
    (Just "Conflict")

-- 410 Gone
-- Indicates that the resource requested was previously in use but is no longer
-- available and will not be available again. This should be used when a
-- resource has been intentionally removed and the resource should be purged.
-- Upon receiving a 410 status code, the client should not request the resource
-- in the future. Clients such as search engines should remove the resource from
-- their indices. Most use cases do not require clients and search engines to
-- purge the resource, and a "404 Not Found" may be used instead.
gone :: Headers -> RequestHandler
gone headers _ =
  pure $ createResponse
    ""
    (Just headers)
    (Just 410)
    (Just "Gone")

-- 411 Length Required
-- The request did not specify the length of its content, which is required by
-- the requested resource.
lengthRequired :: Headers -> RequestHandler
lengthRequired headers _ =
  pure $ createResponse
    ""
    (Just headers)
    (Just 411)
    (Just "Length Required")

-- 412 Precondition Failed
-- The server does not meet one of the preconditions that the requester put on
-- the request header fields.
preconditionFailed :: Headers -> RequestHandler
preconditionFailed headers _ =
  pure $ createResponse
    ""
    (Just headers)
    (Just 412)
    (Just "Precondition Failed")

-- 413 Payload Too Large
-- The request is larger than the server is willing or able to process.
-- Previously called "Request Entity Too Large" in RFC 2616.
payloadTooLarge :: Headers -> RequestHandler
payloadTooLarge headers _ =
  pure $ createResponse
    ""
    (Just headers)
    (Just 413)
    (Just "Payload Too Large")

-- 414 URI Too Long
-- The URI provided was too long for the server to process. Often the result of
-- too much data being encoded as a query-string of a GET request, in which case
-- it should be converted to a POST request.
uriTooLong :: Headers -> RequestHandler
uriTooLong headers _ =
  pure $ createResponse
    ""
    (Just headers)
    (Just 414)
    (Just "URI Too Long")

-- 415 Unsupported Media Type
-- The request entity has a media type which the server or resource does not
-- support.  For example, the client uploads an image as image/svg+xml, but the
-- server requires that images use a different format.
unsupportedMediaType :: Headers -> RequestHandler
unsupportedMediaType headers _ =
  pure $ createResponse
    ""
    (Just headers)
    (Just 415)
    (Just "Unsupported Media Type")

-- 416 Range Not Satisfiable
-- The client has asked for a portion of the file (byte serving), but the server
-- cannot supply that portion.  For example, if the client asked for a part of
-- the file that lies beyond the end of the file.
rangeNotSatisfiable :: Headers -> RequestHandler
rangeNotSatisfiable headers _ =
  pure $ createResponse
    ""
    (Just headers)
    (Just 416)
    (Just "Range Not Satisfiable")

-- 417 Expectation Failed
-- The server cannot meet the requirements of the Expect request-header field.
expectationFailed :: Headers -> RequestHandler
expectationFailed headers _ =
  pure $ createResponse
    ""
    (Just headers)
    (Just 417)
    (Just "Expectation Failed")

-- 418 I'm a teapot
-- This code was defined in 1998 as one of the traditional IETF April Fools'
-- jokes, in RFC 2324, Hyper Text Coffee Pot Control Protocol, and is not
-- expected to be implemented by actual HTTP servers. The RFC specifies this
-- code should be returned by teapots requested to brew coffee. This HTTP status
-- is used as an Easter egg in some websites, such as Google.com's "I'm a
-- teapot" easter egg. Sometimes, this status code is also used as a response to
-- a blocked request, instead of the more appropriate 403 Forbidden.
imATeapot :: Headers -> RequestHandler
imATeapot headers _ =
  pure $ createResponse
    ""
    (Just headers)
    (Just 418)
    (Just "I'm a teapot")

-- 421 Misdirected Request
-- The request was directed at a server that is not able to produce a response
-- (for example because of connection reuse).
misdirectedRequest :: Headers -> RequestHandler
misdirectedRequest headers _ =
  pure $ createResponse
    ""
    (Just headers)
    (Just 421)
    (Just "Misdirected Request")

-- 422 Unprocessable Entity
-- The request was well-formed but was unable to be followed due to semantic
-- errors.
unprocessableEntity :: Headers -> RequestHandler
unprocessableEntity headers _ =
  pure $ createResponse
    ""
    (Just headers)
    (Just 422)
    (Just "Unprocessable Entity")

-- 423 Locked
-- The resource that is being accessed is locked.
locked :: Headers -> RequestHandler
locked headers _ =
  pure $ createResponse
    ""
    (Just headers)
    (Just 423)
    (Just "Locked")

-- 424 Failed Dependency
-- The request failed because it depended on another request and that request
-- failed.
failedDependency :: Headers -> RequestHandler
failedDependency headers _ =
  pure $ createResponse
    ""
    (Just headers)
    (Just 424)
    (Just "Failed Dependency")

-- 425 Too Early
-- Indicates that the server is unwilling to risk processing a request that
-- might be replayed.
tooEarly :: Headers -> RequestHandler
tooEarly headers _ =
  pure $ createResponse
    ""
    (Just headers)
    (Just 425)
    (Just "Too Early")

-- 426 Upgrade Required
-- The client should switch to a different protocol such as TLS/1.3, given in
-- the Upgrade header field.
upgradeRequired :: Headers -> RequestHandler
upgradeRequired headers _ =
  pure $ createResponse
    ""
    (Just headers)
    (Just 426)
    (Just "Upgrade Required")

-- 428 Precondition Required
-- The origin server requires the request to be conditional. Intended to prevent
-- the 'lost update' problem, where a client GETs a resource's state, modifies
-- it, and PUTs it back to the server, when meanwhile a third party has modified
-- the state on the server, leading to a conflict.
preconditionRequired :: Headers -> RequestHandler
preconditionRequired headers _ =
  pure $ createResponse
    ""
    (Just headers)
    (Just 428)
    (Just "Precondition Required")

-- 429 Too Many Requests
-- The user has sent too many requests in a given amount of time. Intended for
-- use with rate-limiting schemes.
tooManyRequests :: Headers -> RequestHandler
tooManyRequests headers _ =
  pure $ createResponse
    ""
    (Just headers)
    (Just 429)
    (Just "Too Many Requests")

-- 431 Request Header Fields Too Large
-- The server is unwilling to process the request because either an individual
-- header field, or all the header fields collectively, are too large.
requestHeaderFieldsTooLarge :: Headers -> RequestHandler
requestHeaderFieldsTooLarge headers _ =
  pure $ createResponse
    ""
    (Just headers)
    (Just 431)
    (Just "Request Header Fields Too Large")

-- 451 Unavailable For Legal Reasons
-- A server operator has received a legal demand to deny access to a resource or
-- to a set of resources that includes the requested resource. The code 451 was
-- chosen as a reference to the novel Fahrenheit 451.
unavailableForLegalReasons :: Headers -> RequestHandler
unavailableForLegalReasons headers _ =
  pure $ createResponse
    ""
    (Just headers)
    (Just 451)
    (Just "Unavailable For Legal Reasons")

-- 5xx
-- 500 Internal Server Error
-- A generic error message, given when an unexpected condition was encountered
-- and no more specific message is suitable.
internalServerError :: Headers -> RequestHandler
internalServerError headers _ =
  pure $ createResponse
    ""
    (Just headers)
    (Just 500)
    (Just "Internal Server Error")

-- 501 Not Implemented
-- The server either does not recognize the request method, or it lacks the
-- ability to fulfil the request. Usually this implies future availability
-- (e.g., a new feature of a web-service API).
notImplemented :: Headers -> RequestHandler
notImplemented headers _ =
  pure $ createResponse
    ""
    (Just headers)
    (Just 501)
    (Just "Not Implemented")

-- 502 Bad Gateway
-- The server was acting as a gateway or proxy and received an invalid response
-- from the upstream server.
badGateway :: Headers -> RequestHandler
badGateway headers _ =
  pure $ createResponse
    ""
    (Just headers)
    (Just 502)
    (Just "Bad Gateway")

-- 503 Service Unavailable
-- The server cannot handle the request (because it is overloaded or down for
-- maintenance).  Generally, this is a temporary state.
serviceUnavailable :: Headers -> RequestHandler
serviceUnavailable headers _ =
  pure $ createResponse
    ""
    (Just headers)
    (Just 503)
    (Just "Service Unavailable")

-- 504 Gateway Timeout
-- The server was acting as a gateway or proxy and did not receive a timely
-- response from the upstream server.
gatewayTimeout :: Headers -> RequestHandler
gatewayTimeout headers _ =
  pure $ createResponse
    ""
    (Just headers)
    (Just 504)
    (Just "Gateway Timeout")

-- 505 HTTP Version Not Supported
-- The server does not support the HTTP version used in the request.
httpVersionNotSupported :: Headers -> RequestHandler
httpVersionNotSupported headers _ =
  pure $ createResponse
    ""
    (Just headers)
    (Just 505)
    (Just "HTTP Version Not Supported")

-- 506 Variant Also Negotiates
-- Transparent content negotiation for the request results in a circular
-- reference.
variantAlsoNegotiates :: Headers -> RequestHandler
variantAlsoNegotiates headers _ =
  pure $ createResponse
    ""
    (Just headers)
    (Just 506)
    (Just "Variant Also Negotiates")

-- 507 Insufficient Storage
-- The server is unable to store the representation needed to complete the
-- request.
insufficientStorage :: Headers -> RequestHandler
insufficientStorage headers _ =
  pure $ createResponse
    ""
    (Just headers)
    (Just 507)
    (Just "Insufficient Storage")

-- 508 Loop Detected
-- The server detected an infinite loop while processing the request (sent
-- instead of 208 Already Reported).
loopDetected :: Headers -> RequestHandler
loopDetected headers _ =
  pure $ createResponse
    ""
    (Just headers)
    (Just 508)
    (Just "Loop Detected")

-- 510 Not Extended
-- Further extensions to the request are required for the server to fulfil it.
notExtended :: Headers -> RequestHandler
notExtended headers _ =
  pure $ createResponse
    ""
    (Just headers)
    (Just 510)
    (Just "Not Extended")

-- 511 Network Authentication Required
-- The client needs to authenticate to gain network access. Intended for use by
-- intercepting proxies used to control access to the network (e.g., "captive
-- portals" used to require agreement to Terms of Service before granting full
-- Internet access via a Wi-Fi hotspot).
networkAuthenticationRequired :: Headers -> RequestHandler
networkAuthenticationRequired headers _ =
  pure $ createResponse
    ""
    (Just headers)
    (Just 511)
    (Just "Network Authentication Requiredn")