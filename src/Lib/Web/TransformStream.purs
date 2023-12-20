module Lib.Web.TransformStream where

import Prelude

import Effect (Effect)
import Data.Nullable (Nullable)

foreign import data TransformStream i o

foreign import data QueuingStrategy :: Type -> Type

foreign import data ReadableStream o

foreign import data WritableStream i

module SudoLang.TransformStream
  ( create
  , getReadable
  , getWritable
  ) where

import Effect (Effect)
import Control.Promise (Promise)
import Data.Nullable (Nullable)

foreign import create ::
  forall i o.
  Nullable (Transformer i o) ->
  Nullable (QueuingStrategy i) ->
  Nullable (QueuingStrategy o) ->
  Effect (TransformStream i o)

foreign import getReadable ::
  forall i o.
  TransformStream i o ->
  Effect (ReadableStream o)

foreign import getWritable ::
  forall i o.
  TransformStream i o ->
  Effect (WritableStream i)

