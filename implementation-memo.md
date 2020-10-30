# 実装メモ

## Rotation Constraintの回転順序

ムズい

### Sourceの回転差分の決定

- SourceがLocal Spaceの場合
  - 初期状態のLocal Transformを親と見立てて、そこからのローカルでどう回転したかを差分とする
- SourceがModel Spaceの場合
  - シンプルにModel Spaceで観測し、初期状態からどう回転したかを差分とする

### Destinationへの回転の適用の決定

- DestinationがLocal Spaceの場合
  - 初期状態のLocal Transformを親と見立てて、そこから子を回すように回転差分を適用する
- DestinationがModel Spaceの場合
  - 初期状態にTransformを戻した上で、シンプルにModel Spaceに回転差分を適用する
  - つまり、いったんモデルスペースのInverse Matrixの回転を当ててから・回転を適用して・戻す、必要がある

## Aim Constraintの向きの決定

- DestinationとSourceがごっちゃになりやすいので注意！
  - 制約される側がDestinationでfrom
  - 制約する側がSourceでto

### Direction Vector決め

- 現在のDestinationからSourceへの向き
- ふつうにSource・DestinationごとにLocal SpaceもしくはModel Spaceで位置を観測する
- それらをfromとtoで結び、normalize

### Aim回転を求める

- Aim VectorとDirection Vectorそれぞれに対してthetaを取る
- Direction VectorのAim Vectorに対するphiを取る
- phiの差分からクォータニオンを作り・thetaの差分から作ったクォータニオンをmultiplyする

### 回転差分を求める

- あらかじめ、Aim回転を求めておく
- 現在のAim回転に初期のAim回転のInverseを当てる

### 回転の適用

- Destinationの初期ローカル回転を記録する
- それに対して上で求めた回転差分をpremultiplyする
