module Lib.Endpoint where

import Data.Tuple.Nested (Tuple3, get1, get2, get3)
import Lib.Server (RequestHandler)
import Lib.Method (Method)
import Lib.Route (Route)

type Endpoint = Tuple3 Method Route RequestHandler

getMethod :: Endpoint -> Method
getMethod = get1

getRoute :: Endpoint -> Route
getRoute = get2

getHandler :: Endpoint -> RequestHandler
getHandler = get3