module Lib.Web.WritableStream where

import Prelude

import Data.Nullable (Nullable)
import Control.Promise (Promise, reject, resolve)

-- Declare Data Types

foreign import data WritableStream a

foreign import data WritableStreamDefaultControllerStartCallback
foreign import data WritableStreamDefaultControllerWriteCallback a
foreign import data WritableStreamDefaultControllerCloseCallback
foreign import data WritableStreamErrorCallback

foreign import data WritableStreamDefaultWriter a

-- Create PureScript API using Foreign Imports

foreign import create :: forall a.
  Nullable WritableStreamDefaultControllerStartCallback ->
  Nullable (WritableStreamDefaultControllerWriteCallback a) ->
  Nullable WritableStreamDefaultControllerCloseCallback ->
  Nullable WritableStreamErrorCallback ->
  Promise (Nullable (WritableStream a))

foreign import getLocked :: forall a. WritableStream a -> Boolean

foreign import close :: forall a. WritableStream a -> Promise Unit
foreign import abort :: forall a. WritableStream a -> Nullable Unknown -> Promise Unit
foreign import getWriter :: forall a. WritableStream a -> Promise (Nullable (WritableStreamDefaultWriter a))

foreign import getDefaultWriterClosed :: forall a. WritableStreamDefaultWriter a -> Promise Unit
foreign import getDefaultWriterDesiredSize :: forall a. WritableStreamDefaultWriter a -> Nullable Number

foreign import writeData :: forall a. WritableStreamDefaultWriter a -> a -> Promise Unit
foreign import closeWriter :: forall a. WritableStreamDefaultWriter a -> Promise Unit
foreign import abortWriter :: forall a. WritableStreamDefaultWriter a -> Nullable Unknown -> Promise Unit

-- Expose functions to PureScript

create'
  :: Nullable (WritableStreamDefaultControllerStartCallback)
  -> Nullable (WritableStreamDefaultControllerWriteCallback a)
  -> Nullable WritableStreamDefaultControllerCloseCallback
  -> Nullable WritableStreamErrorCallback
  -> Promise (Nullable (WritableStream a))
create' = create

getLocked' :: forall a. WritableStream a -> Boolean
getLocked' = getLocked

close' :: forall a. WritableStream a -> Promise Unit
close' = close

abort' :: forall a. WritableStream a -> Nullable Unknown -> Promise Unit
abort' = abort

getWriter' :: forall a. WritableStream a -> Promise (Nullable (WritableStreamDefaultWriter a))
getWriter' = getWriter

getDefaultWriterClosed' :: forall a. WritableStreamDefaultWriter a -> Promise Unit
getDefaultWriterClosed' = getDefaultWriterClosed

getDefaultWriterDesiredSize' :: forall a. WritableStreamDefaultWriter a -> Nullable Number
getDefaultWriterDesiredSize' = getDefaultWriterDesiredSize

writeData' :: forall a. WritableStreamDefaultWriter a -> a -> Promise Unit
writeData' = writeData

closeWriter' :: forall a. WritableStreamDefaultWriter a -> Promise Unit
closeWriter' = closeWriter

abortWriter' :: forall a. WritableStreamDefaultWriter a -> Nullable Unknown -> Promise Unit
abortWriter' = abortWriter
