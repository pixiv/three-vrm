# 実装メモ

## Position COnstraintの移動処理

### Sourceの移動差分の決定

- ふつうにLocal SpaceもしくはModel Spaceで位置を観測する
- ふつうに現在の状態から初期状態を引くと移動差分が出来上がる
- freezeAxesがあれば、freezeされていない軸を移動差分から取り除く
- weightがあれば、移動差分をweight倍する

### Destinationへの移動の適用

- 初期状態のLocal Spaceの位置を取っておく
- そこに対してLocal SpaceもしくはModel Spaceで移動差分を足す
  - Model Spaceで移動差分を足す場合、以下の手順で行う:
    - Local Positionを移動差分に設定
    - Model Spaceの親のinverse **からTranslateを抜いたもの** をそのLocal Positionに当てる
    - 初期状態のLocal Positionをそこに足す

## Rotation Constraintの回転処理

### Sourceの回転差分の決定

- SourceがLocal Spaceの場合
  - 観測するSourceの回転は常にLocal Space
  - 現在の回転に対して、初期回転のinverseをpremultiplyする
    - 言い換えれば、初期状態のLocal Transformを親と見立てて、そこからのローカルでどう回転したかを差分とする
    - 🤔 これ、本当にpremultiplyだと思いますか？
- SourceがModel Spaceの場合
  - 観測するSourceの回転は常にModel Space
  - 現在の回転に対して、初期回転のinverseをmultiplyする
    - 言い換えれば、シンプルにModel Spaceで観測し、初期状態からどう回転したかを差分とする
- freezeAxesがあれば、freezeされていない軸の回転を取り除く
  下記「回転におけるfreezeAxes」を参照
- weightがあれば、単位クォータニオンに向けて(1.0 - weight)だけslerpする

### Destinationへの回転の適用

- DestinationがLocal Spaceの場合
  - 回転差分に対して、初期の回転差分をpremultiplyする
    - 言い換えれば、初期状態のLocal Transformを親と見立てて、そこから子を回すように回転差分を適用する
    - 🤔 これ、本当にpremultiplyだと思いますか？
- DestinationがModel Spaceの場合
  - Model Spaceの親のinverse, 回転差分, Model Spaceの親, 初期状態のLocal、の順にmultiplyする
    - 言い換えれば、シンプルにModel Spaceで初期状態に対して回転差分を適用する

## Rotation ConstraintにおけるfreezeAxes

- 検討中
- 現在、いったん対数クォータニオンにしてfreezeされていない軸の回転値を0倍する手法で実装してみています

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

### Aim回転差分を求める

- あらかじめ、Aim回転を求めておく
- 現在のAim回転に初期のAim回転のInverseをmultiplyする
- freezeAxesがあれば、freezeされていない軸の回転を取り除く
  下記「回転におけるfreezeAxes」を参照
- weightがあれば、単位クォータニオンに向けて(1.0 - weight)だけslerpする

### Destinationへの回転の適用

- Destinationの初期ローカル回転を記録する
- それに対して上で求めた回転差分をpremultiplyする

## 依存関係を含むconstraint

```
let constraintsPending = empty set of Constraint
let constraintsDone = empty set of Constraint

function updateConstraint( constraint )
  if not constraintsDone.has( constraint ) then
    if constraintPending.has( constraint ) then
      throw "Circular dependency detected"
    end if

    constraintsPending.add( constraint )
    foreach dependency in constraint.dependencies do
      updateConstraint( constraint )
    end foreach
    constraintsPending.delete( constraint )

    process constraint

    constraintsDone.add( constraint )
  end if
end function

function updateConstraints
  foreach constraint in constraints do
    updateConstraint( constraint )
  end foreach
end function
```
